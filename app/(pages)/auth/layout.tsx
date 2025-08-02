import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm">{children}</Card>
    </div>
  );
}
