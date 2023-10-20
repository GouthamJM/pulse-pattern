import { Inter } from "next/font/google";

import PageLayoutHoc from "@/hocs/PageLayoutHoc";
import HomePage from "@/ui_components/home/HomePage";
import withAuth from "@/hocs/withAuth";
import { LiveChallenge } from "@/ui_components/challenges";

export default withAuth(PageLayoutHoc(LiveChallenge, { showHeader: true }));
