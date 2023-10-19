import { Header } from "@/ui_components/shared";

export default function PageLayoutHoc(
    HocComponent,
    { showHeader } = { showHeader: true },
) {
    function PageLayoutHoc(props) {
        return (
            <div className="app mobView">
                {showHeader && <Header />}
                {showHeader ? (
                    <div className="pt-[60px]">
                        <HocComponent {...props} />
                    </div>
                ) : (
                    <HocComponent {...props} />
                )}
            </div>
        );
    }
    return PageLayoutHoc;
}
