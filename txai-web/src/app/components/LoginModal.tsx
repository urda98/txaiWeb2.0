"use client";

import { Mail, Lock, ArrowRight, X } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: () => void;
};

export default function LoginModal({ isOpen, onClose, onOpenRegister }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl"
        role="dialog"
        aria-labelledby="login-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X size={22} />
        </button>

        <header className="text-center mb-8">
          <h2
            id="login-title"
            className="font-merriweather-bold text-2xl text-[var(--txai-red)]"
          >
            BIENVENIDO
          </h2>
          <p className="mt-1 font-montserrat text-sm text-gray-500">
            Ingresa tus datos para continuar
          </p>
        </header>

        <form
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block font-montserrat-bold text-xs uppercase tracking-wider text-gray-700"
            >
              EMAIL
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 font-montserrat text-sm placeholder:text-gray-400 focus:border-[var(--txai-red)] focus:ring-1 focus:ring-[var(--txai-red)] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block font-montserrat-bold text-xs uppercase tracking-wider text-gray-700"
            >
              CONTRASEÑA
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="login-password"
                type="password"
                placeholder="........."
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 font-montserrat text-sm placeholder:text-gray-400 focus:border-[var(--txai-red)] focus:ring-1 focus:ring-[var(--txai-red)] outline-none transition-colors"
              />
            </div>
            <div className="mt-1.5 flex justify-end">
              <button
                type="button"
                className="font-montserrat text-xs text-[var(--txai-red)] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--txai-red)] py-3.5 font-montserrat-bold text-sm uppercase tracking-wider text-white transition-colors hover:opacity-95 active:opacity-90"
          >
            INICIAR SESIÓN
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-5 text-center font-montserrat text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onOpenRegister}
            className="font-montserrat-bold text-[var(--txai-red)] hover:underline"
          >
            Regístrate
          </button>
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="font-montserrat text-xs uppercase tracking-wider text-gray-400">
            O continúa con
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 font-montserrat text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <GoogleIcon className="h-5 w-5" />
            Google
          </button>
        </div>
      </div>
    </>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
