const UserDropdown = () => {
    return (
      <div className="w-[200px] relative bg-white h-[200px] overflow-hidden shrink-0 max-w-full max-h-full text-left text-sm text-grey-90 font-body-3-small">
        <div className="absolute top-[28px] left-[24px] flex flex-col items-start justify-start gap-[24px_0px]">
          <div className="flex flex-row items-center justify-start gap-[0px_10px]">
            <img
              className="w-6 relative h-6 overflow-hidden shrink-0"
              alt=""
              src="/profile-icon.svg"
            />
            <div className="relative leading-[24px]">Profile</div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[0px_10px]">
            <img
              className="w-6 relative h-6 overflow-hidden shrink-0"
              alt=""
              src="/settings-icon.svg"
            />
            <div className="relative leading-[24px]">Settings</div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[0px_10px]">
            <img
              className="w-6 relative h-6 overflow-hidden shrink-0"
              alt=""
              src="/logout-icon.svg"
            />
            <div className="relative leading-[24px]">Logout</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserDropdown;
  