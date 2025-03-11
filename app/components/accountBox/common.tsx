import { type ButtonHTMLAttributes } from "react";

export const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center my-2.5">
      {children}
    </div>
  );
};

export const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <form className="w-full flex flex-col">
      {children}
    </form>
  );
};

export const MutedLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <a href={href} className="text-xs text-gray-300 font-medium no-underline border-b border-dashed border-gray-300">
      {children}
    </a>
  );
};

type BoldLinkProps = {
  children: React.ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BoldLink = ({ children, onClick, ...props }: BoldLinkProps) => {
  return (
    <button
      onClick={onClick}
      className="text-xs text-primary font-medium no-underline border-b border-dashed border-primary"
      {...props}
    >
      {children}
    </button>
  );
};

type InputProps = {
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="w-full h-10 outline-none border border-gray-300 rounded-md px-2.5 transition-all mb-1 text-sm placeholder-gray-300 focus:border-primary"
      {...props}
    />
  );
};

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full max-w-[150px] py-2.5 text-white text-sm font-semibold border-none rounded-full cursor-pointer transition-all bg-gradient-to-r from-primary to-primary/60 hover:brightness-105"
      {...props}
    >
      {children}
    </button>
  );
};

export const LineText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xs text-gray-300 font-medium">
      {children}
    </p>
  );
};
