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
    input: false,
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
          <div className="flex flex-col font-Quote items-center w-full h-full relative">
            <h1 className="text-3xl py-2 tracking-widest">My Profile</h1>
            <img
              src={profile["avatar_url"]}
              className="rounded-full w-[50%] opacity-80 border border-white/80"
            />
            <div className="flex items-center pt-4">
              <p className="text-xl tracking-wide">
                {profile["login"]}{" "}
                {profile["name"] && (
                  <span className="text-white/60">{`(${profile["name"]})`}</span>
                )}
              </p>
              <div
                className="px-3 cursor-pointer"
                onClick={() => this.setState({ input: true })}
              >
                <EditSvg />
              </div>
            </div>
            <p className="text-lg  font-light text-white/90">
              {profile["bio"]}
            </p>
            <div className="grid grid-cols-3 w-full place-items-center p-2 text-xl">
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
            <div className="flex-1 px-4 flex flex-col justify-center items-center">
              <div>
                <img
                  className="w-[70%] opacity-80 mb-2"
                  src={`https://github-readme-stats.vercel.app/api?username=${profile["login"]}&show_icons=true&theme=dark`}
                  alt={profile["login"]}
                />
                <img
                  className="w-[70%] float-right opacity-80"
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile["login"]}&layout=compact&theme=dark&hide=angular,blade,css,html,sass,scss,smarty,ts`}
                  alt={profile["login"]}
                />
              </div>
            </div>
            <div className="py-1">
              <p className="text-lg">
                Copyright © 2023{" "}
                <a
                  className="hover:text-blue-500 duration-300 transition"
                  href="https://github.com/romysaputrasihananda"
                  target="blank"
                >
                  Romyyy
                </a>
                . All Rights Reserved
              </p>
            </div>
          </div>
        )}
      </>
    );
  };
}

export default Profile;
