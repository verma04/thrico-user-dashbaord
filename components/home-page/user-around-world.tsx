import getData from "@/app/server/get-details";
import WorldMap from "@/components/ui/world-map";

async function UserAroundWorld() {
  const data = await getData();

  console.log("data", data);

  const color = data?.theme?.primaryColor || "#0ea5e9";

  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl sm:text-2xl md:text-4xl dark:text-white text-black">
          Users <span className="text-neutral-400">Around World</span>
        </p>
        <p className="text-sm sm:text-base md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          See how our global community connects and collaborates from every
          continent.
        </p>
      </div>
      <WorldMap
        lineColor={color}
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 32.219, lng: 76.3234 }, // New Delhi
          },
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          // --- Added more connections from India ---
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
          },
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: 55.7558, lng: 37.6173 }, // Moscow
          },
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: 40.7128, lng: -74.006 }, // New York
          },
          {
            start: { lat: 30.219, lng: 76.3234 }, // New Delhi
            end: { lat: 48.8566, lng: 2.3522 }, // Paris
          },
          {
            start: { lat: 32.219, lng: 76.3234 }, // New Delhi
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
        ]}
      />
    </div>
  );
}

export default UserAroundWorld;
