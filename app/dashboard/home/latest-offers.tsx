import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LatestOffers() {
  const offers = [
    {
      title: "Premium Membership Discount",
      company: "TechLearn Academy",
      discount: "50% OFF",
      expires: "2 days",
      originalPrice: "$99",
      salePrice: "$49",
      isHot: true,
    },
    {
      title: "Free Consultation Session",
      company: "Career Guidance Pro",
      discount: "FREE",
      expires: "1 week",
      originalPrice: "$150",
      salePrice: "Free",
      isHot: false,
    },
    {
      title: "Design Tools Bundle",
      company: "CreativeSpace",
      discount: "30% OFF",
      expires: "5 days",
      originalPrice: "$199",
      salePrice: "$139",
      isHot: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Latest Offers & Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="text-xs">
                    {offer.discount}
                  </Badge>
                  {offer.isHot && (
                    <Badge
                      variant="default"
                      className="text-xs bg-orange-500"
                    >
                      Hot
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-red-500 font-medium">
                  Expires in {offer.expires}
                </span>
              </div>
              <h4 className="font-medium text-sm mb-1">{offer.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{offer.company}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-green-600">
                    {offer.salePrice}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-6 px-2"
                >
                  Claim
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Link href="/dashboard/offers">
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 bg-transparent"
          >
            View All Offers
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}