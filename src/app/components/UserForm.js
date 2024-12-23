// components/RegisterForm.js
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import bcrypt from 'bcryptjs'; // Usa bcryptjs para compatibilidad con el navegador

const RegisterUserSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'La contraseña debe contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'La contraseña debe contener al menos un carácter especial.' }),
});

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Aquí normalmente enviarías los datos a tu API backend
    console.log({ ...data, password: hashedPassword });
    
    // Redirigir o mostrar mensaje de éxito
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
}
