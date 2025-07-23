import React from "react";


export default function AdminPage() {
  return (
    <div className="content-center content-gap-20 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="box-sign-in p-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm img-center">
          <img
            alt="logo"
            src="./logoka.svg"
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Bem-vindo à página de administração
          </h2>
        </div>
      </div>
    </div>
  );
}