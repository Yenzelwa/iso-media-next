import React from "react";
import { SecuritySettings } from "@/typings";


interface SecuritySectionProps {
  security: SecuritySettings;
}

export function Security({ security }: SecuritySectionProps) {
  return (
    <section className="p-8 rounded-lg bg-zinc-800">
      <h2 className="mb-8 text-2xl font-bold">Security & Privacy</h2>
      <div className="pb-6 mb-8 border-b border-neutral-700">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
          <div>
            <p className="mb-2 text-lg font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-neutral-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm">
              {security.twoFactor ? "Enabled" : "Disabled"}
            </span>
            <button className="text-sm text-red-600">
              {security.twoFactor ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-6 text-xl font-bold">Recent Account Access</h3>
        <div className="p-6 rounded bg-neutral-700">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
              <span className="text-neutral-400">Last Access</span>
              <span>{security.lastAccess}</span>
            </div>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
              <span className="text-neutral-400">Location</span>
              <span>{security.location}</span>
            </div>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
              <span className="text-neutral-400">Device</span>
              <span>{security.device}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="px-6 py-3 font-medium bg-red-600 rounded">
          Sign out of all devices
        </button>
      </div>
    </section>
  );
}
