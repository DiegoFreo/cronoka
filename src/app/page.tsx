'use client';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/contexts/AuthContexts';

import '@/componets/styles.css';

interface UserType {
  idUser: number;
  nameUser: string;
  emailUser: string;
  passworUser: string;
  nivelUser: string;
  avatarUser: Blob | null;
  // Adicione outros campos conforme necessário
}

export default function Home() {
  const { register, handleSubmit } = useForm();
  const {signIn} = useContext(AuthContext);

 async function handleSingIn(e:any) {
   
  const { emailUser, passworUser } = e as UserType;
  
      await signIn({emailUser, passworUser});
  }

  return (
    <>
     <div className="content-center  content-gap-20 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="box-sign-in p-20">
          
        <div className="sm:mx-auto sm:w-full sm:max-w-sm img-center">
          <img
            alt="logo"
            src="./logoka.svg"
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method='POST'  className="space-y-6" onSubmit={handleSubmit(handleSingIn)} >
            <div>
              <label htmlFor="emailUser" className="block text-sm/6 font-medium text-gray-900">
                Email:
              </label>
              <div className="mt-2">
                <input
                  {...register('emailUser')}
                  id="emailUser"
                  name="emailUser"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white p-10 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="passworUser" className="block text-sm/6 font-medium text-gray-900">
                  Senha:
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register('passworUser')}
                  id="passworUser"
                  name="passworUser"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md p-10 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full p-10 mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  )
}