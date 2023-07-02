/*
   template: https://tailwindcomponents.com/component/full-page-overlay-loading-screen
 */
export default function Loader() {
  return (
    <div className="gradient fixed left-0 top-0 z-50 block h-full w-full opacity-75">
      <span
        className="relative top-1/2 mx-auto my-0 block h-0 w-0 text-white opacity-75"
        style={{ top: "50%" }}
      >
        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
      </span>
    </div>
  );
}
