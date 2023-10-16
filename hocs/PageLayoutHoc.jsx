import { Header } from "@/ui_components/shared";

export default function PageLayoutHoc(HocComponent) {
    function PageLayoutHoc(props) {
        return (
            <div className="app mobView">
                <Header />
                <HocComponent {...props} />
            </div>
        );
    }
    return PageLayoutHoc;
}
