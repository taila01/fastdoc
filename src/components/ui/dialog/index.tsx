"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
  persistent?: boolean;
}

export default function Modal({ isOpen, onClose, children, className, persistent = false }: ModalProps) {

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" static={persistent} className={`relative z-[999]`} onClose={(value) => !persistent ? onClose?.(value) : () => { }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-95" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`w-auto ${className || 'bg-white dark:bg-gray-800'}    relative overflow-hidden rounded-2xl
          border border-white/15 dark:border-white/10
          bg-white/55 dark:bg-neutral-900/40
          backdrop-blur-xl p-4 sm:p-6
          shadow-xl`}>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
