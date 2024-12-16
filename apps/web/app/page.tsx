import Image, { type ImageProps } from "next/image";

import { api } from "@camaras/api/src/enden";
import { HomeScreen } from "@camaras/ui/src/home/screen"

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  return <HomeScreen />
}
