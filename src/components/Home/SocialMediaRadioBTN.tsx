const SocialMediaRadioBTN = ({
  selectedSocialMedia,
  value,
  setSelectedSocialMedia,
  title,
  logo,
}: {
  selectedSocialMedia: string | undefined;
  setSelectedSocialMedia: any;
  value: string;
  title?: string | undefined;
  logo?: string | null;
}) => {
  return (
    <label
      title={title}
      className="flex gap-1 w-fit h-fit rounded-2xl items-center  cursor-pointer relative"
    >
      <input
        type="radio"
        value={value}
        checked={selectedSocialMedia === value}
        onChange={(e) => setSelectedSocialMedia(e.target.value)}
        className="hidden peer "
      />
      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
        <span
          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
            selectedSocialMedia === value ? "bg-primary" : "bg-white"
          }`}
        ></span>
      </div>
      <span>{value}</span>
      {logo && <img src={logo} className="w-8" />}
    </label>
  );
};

export default SocialMediaRadioBTN;
