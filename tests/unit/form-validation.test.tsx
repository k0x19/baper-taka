import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

/** Confirms React Hook Form + Zod resolver are wired together without inventing a feature form. */
const schema = z.object({
  email: z.email('Enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

function ResolverHarness() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={handleSubmit(() => undefined)}>
      <label htmlFor="email">Email</label>
      <input id="email" {...register('email')} />
      <button type="submit">Submit</button>
      {errors.email?.message !== undefined && <p role="alert">{errors.email.message}</p>}
    </form>
  );
}

describe('React Hook Form + Zod integration', () => {
  it('shows a Zod validation message for invalid input', async () => {
    const user = userEvent.setup();
    render(<ResolverHarness />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address');
    });
  });
});
