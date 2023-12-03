import React from "react";

class Profile extends React.Component<{ data: any }> {
  constructor(props: { data: any }) {
    super(props);
  }
  render = (): React.ReactNode => {
    const { data } = this.props;
    return (
      <div className="flex flex-col items-center w-full">
        <p>My Profile</p>
        <img src={data.avatar_url} className="rounded-full w-[50%]" />
        <p className="text-2xl">{data.login}</p>
      </div>
    );
  };
}

export default Profile;
