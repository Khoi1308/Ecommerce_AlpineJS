import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../components/navigator";
import { getAllBanners } from "../../lib/api";
import CarouselBanner from "../../components/SlideWindow/banner";
import ProductCreationForm from "../../components/Modal";

export const Home = () => {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: any) => {
      return data.data || data;
    },
  });

  return (
    <div>
      <Navbar></Navbar>
      {/* <DragAndDrop /> */}
      <ProductCreationForm />
      {/* BANNER */}
      <div className="bg-gray-100 min-h-screen">
        <div className="w-full bg-white">
          <div className="bg-white rounded-lg flex items-center justify-center mt-7">
            {banners.length === 0 ? (
              <div className="p-8 text-red-500">No banners available</div>
            ) : (
              <CarouselBanner autoSlide={true}>
                {banners.map((banner, index: number) => (
                  <img
                    src={banner.img_url}
                    alt={`banner ${index + 1}`}
                    className="w-[4000px] h-[400px]"
                  />
                ))}
              </CarouselBanner>
            )}
          </div>
          <div className="container flex items-center justify-between">
            <div className="font-bold text-xl italic">Best seller</div>
            <div className="hover:underline"> See all</div>
          </div>
        </div>
      </div>
    </div>
  );
};