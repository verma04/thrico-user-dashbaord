"use client";
import React, { useState } from "react";
import { useCheckUserAccount } from "./grapqhl/queries";
import { switchUserAccount, useGetOrgDetails } from "./grapqhl/action";
import moment from "moment";
import { redirect } from "next/navigation";

// TODO: Implement this hook to call your switch account mutation
// import { useSwitchUserAccount } from "./grapqhl/actions";

type Account = {
  id: number;
  name: string;
  image: string;
  url: string;
  lastActive: boolean;
};

interface AccountSwitchSheetProps {
  open: boolean;
  onClose: () => void;
  onSwitch: (url: string) => void;
}

export const AccountSwitchSheet: React.FC<AccountSwitchSheetProps> = ({
  open,
  onClose,
  onSwitch,
}) => {
  const { data: accountData, loading } = useCheckUserAccount();
  const { data: orgData } = useGetOrgDetails();
  const [switchingId, setSwitchingId] = useState<number | null>(null);
  const [switchLoading, setSwitchLoading] = useState(false);

  const [choose] = switchUserAccount({
    async onCompleted(data) {
      try {
        setSwitchLoading(false);

        window.location.href = `http://${data?.switchAccount.domain}.localhost:3001/auth?token=${data?.switchAccount.token}&path=http//${data?.switchAccount.domain}.localhost:3001`;

        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  // Uncomment and implement this hook
  // const [switchAccount, { loading: mutationLoading }] = useSwitchUserAccount({
  //   onCompleted: async (data) => {
  //     // Clear storage, reset state, etc.
  //     setSwitchingId(null);
  //     window.location.reload();
  //   },
  //   onError: () => setSwitchingId(null),
  // });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40">
      <div className="bg-white rounded-t-2xl w-full max-w-md mx-auto p-6 h-2/4 shadow-lg animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Switch Account</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {switchLoading ? (
          <div className="py-8 text-center text-gray-500">Loading...</div>
        ) : (
          <ul>
            {accountData?.checkAllUserAccount?.map((account: any) => {
              const isActive = orgData?.getOrgDetails?.id === account.id;
              return (
                <li key={account.id}>
                  <button
                    className={`flex items-center w-full px-3 py-2 rounded-lg mb-2 transition hover:bg-gray-100 ${
                      isActive ? "border-2 border-blue-500 bg-blue-50" : ""
                    }`}
                    disabled={switchingId === account.id || isActive}
                    onClick={() => {
                      if (orgData?.getOrgDetails?.id !== account.id) {
                        setSwitchLoading(true);
                        choose({
                          variables: {
                            input: {
                              entityId: account.id,
                              deviceName: "sdds",
                              device_id: "121221",
                              deviceType: "WEB",
                            },
                          },
                        });
                      }
                    }}
                  >
                    <img
                      src={
                        account.logo
                          ? `https://thrico.blr1.cdn.digitaloceanspaces.com/${account.logo}`
                          : "https://i.pravatar.cc/40"
                      }
                      alt={account.name}
                      className="w-8 h-8 rounded-full mr-3 object-cover"
                    />
                    <span className="flex-1 text-left">{account.name}</span>
                    {isActive ? (
                      <span className="text-xs text-blue-600 font-semibold ml-2">
                        Active Now
                      </span>
                    ) : switchingId === account.id ? (
                      <span className="text-xs text-gray-500 ml-2">
                        Switching...
                      </span>
                    ) : account.lastActive ? (
                      <span className="text-xs text-blue-600 font-semibold ml-2">
                        Last Active {moment(account.lastActive).fromNow()}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
