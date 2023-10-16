import { Inter } from "next/font/google";

import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import HomePage from "@/ui_components/home/HomePage";

const inter = Inter({ subsets: ["latin"] });

{
    /* <div className="app mobView"></div> */
}
export default PageLayoutHoc(HomePage);
