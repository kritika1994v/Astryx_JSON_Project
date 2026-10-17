
'use client';

import { useState } from 'react';

import { usePopover } from '@astryxdesign/core/Popover';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Typeahead } from '@astryxdesign/core/Typeahead';
import { VStack } from '@astryxdesign/core/Layout';

import type {
  SearchableItem,
  SearchSource,
} from '@astryxdesign/core/Typeahead';

const cities: SearchableItem[] = [
  { id: '1', label: 'Delhi' },
  { id: '2', label: 'Mumbai' },
  { id: '3', label: 'Bengaluru' },
  { id: '4', label: 'Hyderabad' },
  { id: '5', label: 'Chennai' },
  { id: '6', label: 'Kolkata' },
  { id: '7', label: 'Pune' },
  { id: '8', label: 'Noida' },
  { id: '9', label: 'Gurugram' },
  { id: '10', label: 'Lucknow' },
  { id: '11', label: 'Jaipur' },
  { id: '12', label: 'Ahmedabad' },
  { id: '13', label: 'Chandigarh' },
  { id: '14', label: 'Dehradun' },
  { id: '15', label: 'Gorakhpur' },
];

type FormErrors = {
  fullName: string;
  email: string;
  password: string;
  company: string;
  jobTitle: string;
  phone: string;
  city: string;
  details: string;
};

type StatusKind = 'error' | 'success';

export default function FormTwoColumnPage() {
  // FORM STATES

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] =
    useState<SearchableItem | null>(null);
  const [details, setDetails] = useState('');

  // UI STATES

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // POPOVER STATE

  const [popoverMessage, setPopoverMessage] =
    useState('');
  const [popoverKind, setPopoverKind] =
    useState<StatusKind>('success');

  const statusPopover = usePopover({
    dialogLabel: 'Registration status',
    hasLightDismiss: true,
    hasEscapeDismiss: true,
    hasAutoFocus: false,
    hasCloseButton: true,
    isModal: false,
  });

  // CITY SEARCH

  const searchSource: SearchSource = {
    search: (query: string) =>
      cities.filter((item) =>
        item.label
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    bootstrap: () => cities.slice(0, 5),
  };

  // VALIDATION FUNCTIONS

  const validateFullName = () => {
    const value = fullName.trim();

    if (!value) return 'Full name is required';

    if (value.length < 2 || value.length > 100) {
      return 'Name must contain 2–100 characters';
    }

    if (!/^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u.test(value)) {
      return 'Enter a valid full name';
    }

    return '';
  };

  const validateEmail = () => {
    const value = email.trim();

    if (!value) return 'Email address is required';

    if (
      !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(
        value
      )
    ) {
      return 'Enter a valid email address';
    }

    return '';
  };

  const validatePassword = () => {
    if (!password) return 'Password is required';

    if (password.length !== 8) {
      return 'Password must contain exactly 8 characters';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Add at least one uppercase letter';
    }

    if (!/[a-z]/.test(password)) {
      return 'Add at least one lowercase letter';
    }

    if (!/[0-9]/.test(password)) {
      return 'Add at least one number';
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Add at least one special character';
    }

    return '';
  };

  const validateCompany = () => {
    const value = company.trim();

    if (!value) return 'Company name is required';

    if (value.length < 2 || value.length > 100) {
      return 'Company name must contain 2–100 characters';
    }

    return '';
  };

  const validateJobTitle = () => {
    const value = jobTitle.trim();

    if (!value) return 'Job title is required';

    if (value.length < 2 || value.length > 100) {
      return 'Job title must contain 2–100 characters';
    }

    return '';
  };

  const validatePhone = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return 'Enter a valid 10-digit Indian mobile number';
    }

    return '';
  };

  const validateDetails = () => {
    const value = details.trim();
    const words = value.split(/\s+/).filter(Boolean);

    if (!value) return 'Project details are required';

    if (words.length < 10) {
      return 'Enter at least 10 words';
    }

    if (words.length > 100) {
      return 'Maximum 100 words allowed';
    }

    return '';
  };

  const errors: FormErrors = {
    fullName: validateFullName(),
    email: validateEmail(),
    password: validatePassword(),
    company: validateCompany(),
    jobTitle: validateJobTitle(),
    phone: validatePhone(),
    city: city ? '' : 'Please select a city',
    details: validateDetails(),
  };

  const showError = (message: string) =>
    submitted && Boolean(message);

  const wordCount = details.trim()
    ? details.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // SHOW ASTRYX POPOVER

  const showStatus = (
    message: string,
    kind: StatusKind
  ) => {
    setPopoverMessage(message);
    setPopoverKind(kind);
    statusPopover.show({ skipAutoFocus: true });
  };

  // CLEAR FORM AFTER SUCCESS

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setCompany('');
    setJobTitle('');
    setPhone('');
    setCity(null);
    setDetails('');
    setSubmitted(false);
    setError('');
  };

  // REGISTRATION SUBMIT

  const handleSubmit = async () => {
    if (loading) return;

    setSubmitted(true);
    setError('');

    // VALIDATION

    const currentErrors = {
      fullName: validateFullName(),
      email: validateEmail(),
      password: validatePassword(),
      company: validateCompany(),
      jobTitle: validateJobTitle(),
      phone: validatePhone(),
      city: city ? '' : 'Please select a city',
      details: validateDetails(),
    };

    if (Object.values(currentErrors).some(Boolean)) {
      const message =
        'Please fill in all required fields correctly.';

      setError(message);
      showStatus(message, 'error');
      return;
    }

    setLoading(true);

    try {
      // API 1 - REGISTER

      const response = await fetch(
        'http://localhost:3001/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            company: company.trim(),
            jobTitle: jobTitle.trim(),
            phone,
            city: city?.label,
            details: details.trim(),
          }),
        }
      );

      // HANDLE NON-JSON RESPONSES

      const contentType =
        response.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        const responseText = await response.text();

        throw new Error(
          `Unexpected API response: ${responseText.slice(0, 200)}`
        );
      }

      const data = await response.json();

      // API FAILURE

      if (!response.ok || !data.success) {
        const message =
          data.message || 'Registration failed';

        setError(message);
        showStatus(message, 'error');
        return;
      }

      // SAVE REGISTERED USER

      const registeredUser = {
        ...data.user,
        fullName: fullName.trim(),
        email: email.trim(),
        company: company.trim(),
        jobTitle: jobTitle.trim(),
        phone,
        city: city?.label,
        details: details.trim(),
      };

      localStorage.setItem(
        'registeredUser',
        JSON.stringify(registeredUser)
      );

      // SUCCESS

      clearForm();

      showStatus(
        'Your account has been created successfully!',
        'success'
      );
    } catch (err) {
      console.error('Registration error:', err);

      const message =
        err instanceof Error &&
        err.message.startsWith('Unexpected API response:')
          ? 'The registration API returned an invalid response.'
          : 'Unable to connect to the registration API.';

      setError(message);
      showStatus(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // FIELD ERROR MESSAGE

  const ErrorMessage = ({ message }: { message: string }) => (
    <p
      style={{
        color: '#dc2626',
        fontSize: 14,
        fontWeight: 500,
        margin: '4px 0 0',
        lineHeight: 1.5,
      }}
    >
      {message}
    </p>
  );

  return (
    
    <Section width="100%" padding={0}>
      <div className="w-full bg-sky-100">
      <VStack align="center" padding={8} gap={6}>
        <Card padding={8} width="700px">
          <VStack gap={5} align="stretch">
            <VStack gap={2} align="start">
              <Text type="display-2">
                Create your account
              </Text>

              <Text color="secondary">
                Fill in your details and we will get
                everything ready for you.
              </Text>
            </VStack>

            <Divider />

            <VStack gap={2} align="stretch">
              <TextInput
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                placeholder="Enter your full name"
                width="100%"
              />
              {showError(errors.fullName) && (
                <ErrorMessage message={errors.fullName} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextInput
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                width="100%"
              />
              {((submitted || email.length > 0) && Boolean(errors.email)) && (
                <ErrorMessage message={errors.email} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextInput
                label="Password"
                type="password"
                value={password}
                onChange={(value) => setPassword(value.slice(0, 8))}
                placeholder="Enter an 8-character password"
                width="100%"
              />
              {((submitted || password.length > 0) && Boolean(errors.password)) && (
                <ErrorMessage message={errors.password} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextInput
                label="Company"
                value={company}
                onChange={setCompany}
                placeholder="Enter company name"
                width="100%"
              />
              {showError(errors.company) && (
                <ErrorMessage message={errors.company} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextInput
                label="Job Title"
                value={jobTitle}
                onChange={setJobTitle}
                placeholder="Enter your job title"
                width="100%"
              />
              {showError(errors.jobTitle) && (
                <ErrorMessage message={errors.jobTitle} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextInput
                label="Mobile Number"
                type="tel"
                value={phone}
                onChange={(value) =>
                  setPhone(
                    value.replace(/\D/g, '').slice(0, 10)
                  )
                }
                placeholder="9876543210"
                width="100%"
              />
              {phone.length > 0 && !/^[6-9]/.test(phone) && (
                <ErrorMessage message="Mobile number must start with 6, 7, 8, or 9" />
              )}
              {showError(errors.phone) && (
                <ErrorMessage message={errors.phone} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <Typeahead
                label="City"
                placeholder="Search and select a city..."
                searchSource={searchSource}
                value={city}
                onChange={setCity}
                hasEntriesOnFocus
                maxMenuItems={5}
              />
              {showError(errors.city) && (
                <ErrorMessage message={errors.city} />
              )}
            </VStack>

            <VStack gap={2} align="stretch">
              <TextArea
                label="Project Details"
                value={details}
                onChange={setDetails}
                placeholder="Describe your project in at least 10 words"
                width="100%"
              />

              <Text color="secondary">
                {wordCount}/100 words (Minimum 10 words)
              </Text>

              {showError(errors.details) && (
                <ErrorMessage message={errors.details} />
              )}
            </VStack>

            {error && (
              <Text color="error" type="body">
                {error}
              </Text>
            )}

            {/* ASTRYX POPOVER TRIGGER */}

            <VStack ref={statusPopover.triggerRef}>
              <Button
                {...statusPopover.triggerProps}
                label={
                  loading
                    ? 'Creating Account...'
                    : 'Create Account'
                }
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              />
            </VStack>

            {/* ASTRYX POPOVER CONTENT */}

            {statusPopover.render(
              <VStack
                ref={statusPopover.contentRef}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 9999,
                }}
              >
                <Card padding={4} width="300px">
                  <VStack gap={3} align="stretch">
                    <Text
                      type="heading-3"
                      color={popoverKind === 'success' ? 'success' : undefined}
                    >
                      {popoverKind === 'success' ? (
                        'Success'
                      ) : (
                        'Please check your form'
                      )}
                    </Text>

                    <Text>{popoverMessage}</Text>

                    <Button
                      label="Close"
                      variant="primary"
                      onClick={() => statusPopover.hide()}
                    />
                  </VStack>
                </Card>
              </VStack>,
              {
                placement: 'bottom',
                alignment: 'center',
              }
            )}
          </VStack>
        </Card>
      </VStack>
       </div>
    </Section>
   
  );
};