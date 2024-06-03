import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 h-1/3 max-lg:grid-cols-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Livres lus</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Livres totaux</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Dernier Favori</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Mon activité</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 h-1/3 max-lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Mon activité</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon activité</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 h-1/3 max-lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Mon activité</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon activité</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};
