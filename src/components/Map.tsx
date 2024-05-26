import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MapMarker from "./MapMarker.tsx";
import { useState } from "react";
import { useCreatorStore } from "../stores/creatorStore.ts";
import { useContext } from "react";
import { pinContext } from "../lib/pinContext.tsx";
import { useStore } from "zustand";
import { useAxiosClient } from "@/lib/api.ts";
import { useAtom } from "jotai";
import categoryAtom from "@/lib/categoryAtom.ts";
import { createPinUrl, getCreatorPinUrl } from "@/lib/urls.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "oidc-react";

const formSchema = z.object({
  pinText: z.string().min(1, { message: "Pin text" }),
  category: z.enum(["meeting", "travel", "chill"]),
});

export default function Map() {
  const { userData } = useAuth();
  const { categoryFilter, setCategoryFilter } = useState("All");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const { creator, setCreator } = useCreatorStore();
  const store = useContext(pinContext);
  const client = useAxiosClient();
  const [categories] = useAtom(categoryAtom);
  if (!store) throw new Error("Missing pinContext.Provider in the tree");
  const pins = useStore(store, (state) => state.pins);

  function onCategoryChange(value: string) {
    setCategoryFilter(value);
  }

  function MapFunctions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      dblclick: (event) => {
        const { lat, lng } = event.latlng;
        console.log("Lat: ", lat, "Lng: ", lng);
        setCreator(true);
        setPosition([lat, lng]);
      },
    });
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pinText: " ",
      category: "travel",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { pinText, category } = data;
    const [latitude, longitude] = position!;
    const getState = async () => {
      const response = await client.get(
        getCreatorPinUrl(userData!.profile.sub)
      );
      return response.data;
    };

    client
      .post(createPinUrl(), null, {
        params: { pinText, latitude, longitude, category },
      })
      .then(() => {
        getState().then((data) => {
          console.log("Data: ", data);
          store!.getState().setPins(data);
          setCreator(false);
        });
      });
  }

  return (
    <div className="w-full bg-blue-gray-50  flex-row">
      <h1>React Leaflet</h1>
      <MapContainer
        className="flex"
        style={{ height: 800, width: 800 }}
        center={[52.06, 19.25]}
        zoom={6}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins?.map((pin) => (
          <li key={pin.pinId}>
            <MapMarker pinId={pin.pinId} pin={pin} />
          </li>
        ))}
        <MapFunctions />
      </MapContainer>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {creator && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pinText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin Text</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select {...field}>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
      <div> end </div>
    </div>
  );
}
