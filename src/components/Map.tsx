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
import Control from "react-leaflet-custom-control";
import {
  createPinUrl,
  getCreatorPinUrl,
  getPinByCategoryUrl,
} from "@/lib/urls.ts";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "oidc-react";

const formSchema = z.object({
  pinText: z.string().min(1, { message: "Pin text" }),
  category: z.enum(["meeting", "travel", "chill"]),
});

export default function Map() {
  const { userData } = useAuth();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const { creator, setCreator } = useCreatorStore();
  const store = useContext(pinContext);
  const client = useAxiosClient();
  const [categories] = useAtom(categoryAtom);
  if (!store) throw new Error("Missing pinContext.Provider in the tree");
  const pins = useStore(store, (state) => state.pins);

  function onCategoryChange(value: string) {
    if (value === "All") {
      client.get(getCreatorPinUrl(userData!.profile.sub)).then((response) => {
        store!.getState().setPins(response.data);
      });
      return;
    }
    client.get(getPinByCategoryUrl(value)).then((response) => {
      store!.getState().setPins(response.data);
    });
  }

  function MapFunctions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      dblclick: (event) => {
        const { lat, lng } = event.latlng;
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
          store!.getState().setPins(data);
          setCreator(false);
        });
      });
  }

  return (
    <div className="w-full h-full bg-blue-gray-50  flex-row">
      <Dialog open={creator} onOpenChange={setCreator}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pin Form</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
      <MapContainer
        className="fixed w-full h-full"
        center={[52.06, 19.25]}
        zoom={6}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control position="topright">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"All"}>All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Control>
        {pins?.map((pin) => (
          <li key={pin.pinId}>
            <MapMarker pinId={pin.pinId} pin={pin} />
          </li>
        ))}
        <MapFunctions />
      </MapContainer>
    </div>
  );
}
