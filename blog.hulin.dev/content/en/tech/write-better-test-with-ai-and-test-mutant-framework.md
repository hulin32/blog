---
title: Write better test with AI and Test Mutant Framework
date: 2024-11-17
feature_image: /images/ai-stryker-mutator.webp
slug: test-mutant
gitalk: true
---

Feedback loop with AI and Test Mutant Framework to improve test quality.
<!--more-->

I have been writing a lot of tests in my daily work, but I found it hard to write good tests in short time, and I am not sure if the tests are good enough. Thinking about a good test description is time-consuming, otherwise it will become test1/test2. I am looking for a way to improve the quality of tests, and I found AI and Test Mutant Framework can help me to improve the quality of tests and test writing speed.

## AI and Test Mutant Framework

These days AI is explosion, seems like you can't catch the trend :D. In fact it is!  AI definitely can help a lot in different areas, I usually use it to help me quick start some new concept. In this article I will focus on how to use AI to help you write better tests, and how to use Test Mutant Framework to improve the tests AI helps you write.


## The work process
### 1. AI test generation
So firstly, you need to write your own logic, in FE it might be a component, in BE it might be a service. Then copy that section of code(only the logic part) to the AI test generation tool, don't need to care about the import part, AI is smart enough to figure out how to mock it, and then you can get a test file with a lot of test cases. This also make me feel the static type language is better choice in work than dynamic type language, since after the code generated you can see if there is any error in the test file. After this step, then you can check the test file, and see if there is any test case you want to keep, and remove it. Maybe the test logic is not good enough, but the test description I am sure it already help you a lot, you can just modify the test logic part based on the test description to make it better suit your requirement. After that, then your tests are done, easy right?

Ex: There is a [react component demo](https://github.com/hulin32/ai-test-mutant-demo/blob/master/src/App.tsx) I wrote(with AI), ask AI to generate tests with `@testing-library/react` and `vitest` for it, and then you can get a test file like this:
```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  // Mock window.alert
  const alertMock = vi.fn();
  window.alert = alertMock;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('Login Form', () => {
    it('renders login form initially', () => {
      render(<UserInfo />);
      
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('updates email input value', async () => {
      render(<UserInfo />);
      const emailInput = screen.getByLabelText('Email:');
      
      await userEvent.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('updates password input value', async () => {
      render(<UserInfo />);
      const passwordInput = screen.getByLabelText('Password:');
      
      await userEvent.type(passwordInput, 'password');
      
      expect(passwordInput).toHaveValue('password');
    });

    it('shows alert for invalid credentials', async () => {
      render(<UserInfo />);
      
      await userEvent.type(screen.getByLabelText('Email:'), 'wrong@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword');
      
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      expect(alertMock).toHaveBeenCalledWith('Invalid email or password');
    });

    it('requires email and password fields', () => {
      render(<UserInfo />);
      
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Password:');
      
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');
    });
  });

  describe('Login Success', () => {
    it('shows user info after successful login', async () => {
      render(<UserInfo />);
      
      // Fill in correct credentials
      await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'password');
      
      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      // Check if user info is displayed
      await waitFor(() => {
        expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
        expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
      });
    });

    it('displays logout button when logged in', async () => {
      render(<UserInfo />);
      
      // Login
      await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'password');
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      // Check for logout button
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
      });
    });
  });

  describe('Logout', () => {
    it('returns to login form after logout', async () => {
      render(<UserInfo />);
      
      // Login first
      await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'password');
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      // Wait for logout button and click it
      const logoutButton = await waitFor(() => screen.getByRole('button', { name: 'Logout' }));
      await userEvent.click(logoutButton);
      
      // Check if we're back to login form
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    });

    it('clears user data after logout', async () => {
      render(<UserInfo />);
      
      // Login
      await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'password');
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      // Logout
      const logoutButton = await waitFor(() => screen.getByRole('button', { name: 'Logout' }));
      await userEvent.click(logoutButton);
      
      // Verify user info is not displayed
      expect(screen.queryByText('Welcome, John Doe!')).not.toBeInTheDocument();
      expect(screen.queryByText('Email: test@example.com')).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('validates email format', async () => {
      render(<UserInfo />);
      const emailInput = screen.getByLabelText('Email:');
      
      await userEvent.type(emailInput, 'invalid-email');
      
      // Email input should have validation error
      expect(emailInput).toBeInvalid();
    });

    it('prevents form submission with empty fields', async () => {
      render(<UserInfo />);
      
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      // Alert should not be called as form validation prevents submission
      expect(alertMock).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles whitespace in email and password', async () => {
      render(<UserInfo />);
      
      await userEvent.type(screen.getByLabelText('Email:'), ' test@example.com ');
      await userEvent.type(screen.getByLabelText('Password:'), ' password ');
      
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      expect(alertMock).toHaveBeenCalledWith('Invalid email or password');
    });

    it('maintains form state after failed login attempt', async () => {
      render(<UserInfo />);
      
      await userEvent.type(screen.getByLabelText('Email:'), 'wrong@example.com');
      await userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword');
      
      fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
      
      expect(screen.getByLabelText('Email:')).toHaveValue('wrong@example.com');
      expect(screen.getByLabelText('Password:')).toHaveValue('wrongpassword');
    });
  });
});
```
What do you feel? my feeling is I can't write so many tests in short time, and the test description is very good, if you don't like it, you can modify it to fit your cases. If you run test coverage, mostly it will be 100% coverage, but is it means the tests are good enough? I don't think so, I will talk about it in the next section.

### 2. Test Mutant Framework to improve the tests generated by AI
After I started to use this way to write tests, I am thinking how can I make sure the tests are good enough to help me catch bug early. At some point I joined a rust meetup, someone mentioned Test Mutant Framework in rust https://mutants.rs, I was surprised that there is a tool can help you to test your tests :D. After I checked the website and got the concept, I think it is a good idea to use it to test my tests. So I started to check if there are any similiar framework for FE. Of course it has, I found https://stryker-mutator.io. I was starting to use it in my daily work, and I found it is really helpful. It can help you to find out if your tests are good enough, and if there is any conditions you missed in your test. It is a good tool to help you to improve the quality of your tests. Its one step further than test coverage.

Ex: here I am using https://stryker-mutator.io, since its most famous framework in frontend for this, After you config it based on the test runner you are using, add your component you want to test in the `stryker.conf.js` 's `mutate` field, and then run `stryker run`, if there are any tests are suvirved, then you can think about if there are any conditions you missed in your tests, and then add the tests to cover the conditions.

With above component, I run `stryker run`, and I got some survived mutants, some of them like this:
```shell
[Survived] StringLiteral
src/App.tsx:18:45
-       } else if (email === '' || password === '') {
+       } else if (email === '' || password === "Stryker was here!") {
```
This means actually even though your test coverage is 100%, but there are still some conditions you missed in your tests, you need to add tests to cover them

### 3. Feedback loop
With test mutant framework, you can get feedback from it, and then you can improve your tests based on the feedback. And then ask AI to modify the privous generate tests if you want, run the test mutant framework again, and see if the tests are improved. After several iterations, you will find your tests are improved a lot also save a lot of time to write the tests.
