"use client";

import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EventContent from "./EventContent";
import ProfileContent from "./ProfileContent";
import TicketsContent from "./TicketContent";
import { User } from "@supabase/supabase-js";
import { mypageTabs } from "@/lib/constants";

export default function MypageTab({ user }: { user: User | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(tab);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const renderContent = (tab: string) => {
    switch (tab) {
      case "profile":
        return <ProfileContent user={user} />;
      case "tickets":
        return <TicketsContent />;
      case "events":
        return <EventContent />;
      default:
        return <ProfileContent user={user} />;
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="flex flex-col">
          <div className="px-1 py-6">
            <div className="flex space-x-8">
              {mypageTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.replace(
                        pathname + "?" + createQueryString("tab", tab.id)
                      );
                      setActiveTab(tab.id);
                    }}
                    className={cn(
                      "flex items-center gap-2 pb-3 text-xs font-medium transition-colors hover:text-primary",
                      "relative",
                      activeTab === tab.id
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="md:grid md:grid-cols-[240px,1fr] md:gap-8">
        <div className="hidden md:block">
          <Card className="h-fit">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {mypageTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "purple" : "ghost"}
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        router.replace(
                          pathname + "?" + createQueryString("tab", tab.id)
                        );
                        setActiveTab(tab.id);
                      }}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </Button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>
        <div>{renderContent(activeTab)}</div>
      </div>
    </>
  );
}
