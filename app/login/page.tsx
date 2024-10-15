import OauthForm from "@/components/auth/OauthForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="border-0 mx-auto flex items-center justify-center min-h-[80vh] px-4 py-24">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            내 인생의 즐거운 이벤트들 Festivall
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md px-16 mt-8">
          <OauthForm />
        </CardContent>
      </Card>
    </div>
  );
}
