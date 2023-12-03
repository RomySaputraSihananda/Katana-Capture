import React from "react";

class Profile extends React.Component<{ data: any }> {
  constructor(props: { data: any }) {
    super(props);
  }
  render = (): React.ReactNode => {
    const { data } = this.props;
    return (
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl p-5">My Profile</h1>
        <img src={data.avatar_url} className="rounded-full w-[50%]" />
        <p className="text-xl">
          {data.login} {data.name && `(${data.name})`}
        </p>
        <p>{data.bio}</p>
        <div className="grid grid-cols-3 w-full place-items-center">
          <div className="flex flex-col items-center">
            <h1>Following</h1>
            <p>{data.following}</p>
          </div>
          <div className="flex flex-col items-center">
            <h1>Followers</h1>
            <p>{data.followers}</p>
          </div>
          <div className="flex flex-col items-center">
            <h1>Repositories</h1>
            <p>{data.public_repos}</p>
          </div>
        </div>
      </div>
    );
  };
}

export default Profile;
