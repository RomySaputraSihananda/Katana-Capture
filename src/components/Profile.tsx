import React from "react";
import Loading from "./Loading";
import { EditSvg } from "./Svg";
import InputUsername from "./InputUsername";

class Profile extends React.Component<
  {},
  {
    profile: any | null;
    username: string;
    field: string;
    loading: boolean;
    input: boolean;
  }
> {
  state = {
    profile: null,
    username: "romysaputrasihananda",
    field: "",
    loading: false,
    input: true,
  };

  fetchData = async () => {
    this.setState({ loading: true });

    const req = await fetch(
      `https://api.github.com/users/${this.state.username}`
    );

    if (req.status !== 200) {
      this.setState({ loading: false });
      return alert("uername not found");
    }

    this.setState({ profile: await req.json(), loading: false });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{
      username: string;
    }>
  ): void {
    if (prevState.username !== this.state.username) this.fetchData();
  }

  render = (): React.ReactNode => {
    const { profile, loading, input } = this.state;
    return (
      <>
        {loading && <Loading />}
        {input && (
          <InputUsername
            input={(input: boolean) => this.setState({ input })}
            handle={(username: string) =>
              this.setState({ username, input: false })
            }
          />
        )}
        {profile && (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl p-5">My Profile</h1>
            <img
              src={profile["avatar_url"]}
              className="rounded-full w-[50%] border border-white/20"
            />
            <div className="flex items-center pt-4">
              <p className="text-xl">
                {profile["login"]} {profile["name"] && `(${profile["name"]})`}
              </p>
              <div
                className="px-3 cursor-pointer"
                onClick={() => this.setState({ input: true })}
              >
                <EditSvg />
              </div>
            </div>
            <p>{profile["bio"]}</p>
            <div className="grid grid-cols-3 w-full place-items-center p-2">
              <div className="flex flex-col items-center">
                <h1>Following</h1>
                <p>{profile["following"]}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1>Followers</h1>
                <p>{profile["followers"]}</p>
              </div>
              <div className="flex flex-col items-center">
                <h1>Repositories</h1>
                <p>{profile["public_repos"]}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
}

export default Profile;
