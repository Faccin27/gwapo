"use client";

import {
  Activity,
  BarChart3,
  Calendar,
  ChevronUp,
  Globe,
  MapPin,
  Users,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const visitData = [
  { name: "Jan", pageViews: 4000, visitors: 2400 },
  { name: "Feb", pageViews: 3000, visitors: 1398 },
  { name: "Mar", pageViews: 2000, visitors: 9800 },
  { name: "Apr", pageViews: 2780, visitors: 3908 },
  { name: "May", pageViews: 1890, visitors: 4800 },
  { name: "Jun", pageViews: 2390, visitors: 3800 },
  { name: "Jul", pageViews: 3490, visitors: 4300 },
];

const weeklyData = [
  { name: "Mon", pageViews: 900, visitors: 400 },
  { name: "Tue", pageViews: 1200, visitors: 700 },
  { name: "Wed", pageViews: 1500, visitors: 900 },
  { name: "Thu", pageViews: 1300, visitors: 800 },
  { name: "Fri", pageViews: 1100, visitors: 600 },
  { name: "Sat", pageViews: 800, visitors: 400 },
  { name: "Sun", pageViews: 700, visitors: 300 },
];

const locationData = [
  { name: "São Paulo", value: 400, color: "#8884d8" },
  { name: "Rio de Janeiro", value: 300, color: "#82ca9d" },
  { name: "Belo Horizonte", value: 200, color: "#ffc658" },
  { name: "Brasília", value: 150, color: "#ff8042" },
  { name: "Salvador", value: 100, color: "#0088fe" },
];

const deviceData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 10 },
];

const chartConfig = {
  pageViews: {
    label: "Page Views",
    color: "hsl(230, 70%, 60%)",
    icon: Eye,
  },
  visitors: {
    label: "Unique Visitors",
    color: "hsl(160, 70%, 50%)",
    icon: Users,
  },
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value: number;
    payload: {
      name: string;
      value: number;
    };
  }>;
  label?: string;
}

interface LocationData {
  name: string;
  value: number;
  color: string;
}

interface DeviceData {
  name: string;
  value: number;
}

// Custom tooltip component (because the default tooltiop is not styled)
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-gwapo text-sm">
            {entry.name ? `${entry.name}: ` : `${entry.payload.name}: `}
            {entry.value} {entry.name === "visitors" ? "visitors" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight pb-4">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Last 30 days</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Page Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">27,549</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    <span>11.2%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unique Visitors
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16,894</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    <span>8.4%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Locations
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    <span>3.2%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>
                    Page views and unique visitors by month
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart
                      data={visitData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="pageViews"
                        name="pageViews"
                        fill="hsl(230, 70%, 60%)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="visitors"
                        name="visitors"
                        fill="hsl(160, 70%, 50%)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>Top 5 visitor locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          formatter={(value, entry, index) => (
                            <span className="text-foreground">
                              {locationData[index].name}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>
                    Page views and unique visitors by month
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart
                      data={visitData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="pageViews"
                        name="pageViews"
                        fill="hsl(230, 70%, 60%)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="visitors"
                        name="visitors"
                        fill="hsl(160, 70%, 50%)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>Top 5 visitor locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          formatter={(value, entry, index) => (
                            <span className="text-foreground">
                              {locationData[index].name}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                  <CardDescription>
                    Daily traffic for the current week
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart
                      data={weeklyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="pageViews"
                        name="pageViews"
                        fill="hsl(230, 70%, 60%)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="visitors"
                        name="visitors"
                        fill="hsl(160, 70%, 50%)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Visitors by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          <Cell fill="hsl(230, 70%, 60%)" />
                          <Cell fill="hsl(160, 70%, 50%)" />
                          <Cell fill="hsl(280, 70%, 60%)" />
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  Comprehensive view of your site's performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      Avg. Session Duration
                    </span>
                    <span className="text-2xl font-bold">3m 42s</span>
                    <span className="text-xs text-green-500">
                      +12.3% from last month
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Bounce Rate</span>
                    <span className="text-2xl font-bold">42.8%</span>
                    <span className="text-xs text-green-500">
                      -3.6% from last month
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-2xl font-bold">3.2%</span>
                    <span className="text-xs text-green-500">
                      +0.8% from last month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports Content</CardTitle>
                <CardDescription>
                  Detailed reports will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center text-muted-foreground">
                  Advanced reporting dashboard coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Access Section */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Manage your site's SEO settings, social media links, and
                  contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Last updated: 3 days ago</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <a
                  href="/admin/seo"
                  className="text-gwapo text-sm font-medium hover:underline"
                >
                  Manage Settings →
                </a>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Manage your portfolio projects, add new work, edit or delete
                  existing projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span>12 active projects</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <a
                  href="/admin/projects"
                  className="text-gwapo text-sm font-medium hover:underline"
                >
                  Manage Projects →
                </a>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>Ready Made Sites</CardTitle>
                <CardDescription>
                  Manage your templates, pricing, and features for ready-to-use
                  website solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>8 templates available</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <a
                  href="/admin/ready-made-sites"
                  className="text-gwapo text-sm font-medium hover:underline"
                >
                  Manage Templates →
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
