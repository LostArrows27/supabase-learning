"use client";
import { Database } from "@/types/supabase";
import { Button, Input } from "@chakra-ui/react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient();

function Room({ params }: { params: { roomID: string } }) {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [allMessage, setAllMessage] = useState<string[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel>();
  const { roomID } = params;

  const sendMessage = () => {
    channel!.send({
      type: "broadcast",
      event: "test",
      payload: {
        message: message,
      },
    });
    setAllMessage((prev) => [...prev, message]);
    setMessage("");
  };

  useEffect(() => {
    const getUserName = async () => {
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();
      // const { data: testData, error: testError } =
      //   await createClientComponentClient().rpc("test_authorization_header");
      // console.log(
      //   `The user role is ${testData?.role} and the user UUID is ${testData?.sub}. `,
      //   testError
      // );
      setUser(userData!);
      setEmail(userData?.email);
    };

    getUserName();
    const channel: RealtimeChannel = supabase.channel(`room:12`);

    channel
      .on("broadcast", { event: "test" }, (payload) => {
        setAllMessage((prev) => [...prev, payload.payload.message]);
      })
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log("sync", newState);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          let myEmail = email;
          if (!email) {
            console.log("no email");
            const {
              data: { user: userData },
            } = await supabase.auth.getUser();
            myEmail = userData?.email;
          }

          const presenceTrackStatus = await channel.track({
            user: myEmail,
            online_at: new Date().toISOString(),
          });
          console.log(presenceTrackStatus);
        }
      });

    setChannel(channel);

    return () => {
      channel.unsubscribe();
      setChannel(undefined);
    };
  }, []);

  return (
    <div>
      <div>Room ID: {roomID} </div>
      <h1>Welcome user {email}</h1>
      <div className="flex">
        <Input
          className="mr-2"
          focusBorderColor="lime"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button colorScheme="green" onClick={sendMessage}>
          Send
        </Button>
      </div>
      {allMessage.map((msg, index) => {
        return <div key={index}>{msg}</div>;
      })}
    </div>
  );
}

export default Room;
