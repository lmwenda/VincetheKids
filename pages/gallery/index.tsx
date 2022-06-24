import type { NextPage } from "next";
import withAuth from "../../components/ProtectedURL";

const GalleryPage: NextPage = () => {
  return(
    <div>
      <h1>GalleryPage</h1>
    </div>
  );
}

export default withAuth(GalleryPage, true);
