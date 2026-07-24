import { useState, type FormEvent } from "react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }
    setSubscribed(true);
    setEmail("");
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div className="flex items-end gap-4">
        <input
          aria-label="Email address"
          className="w-full border-b border-[#333333] bg-transparent pb-1 text-sm text-[#333333] placeholder:text-[#9f9f9f] focus:outline-none"
          onChange={(event) => {
            setEmail(event.target.value);
            if (subscribed) {
              setSubscribed(false);
            }
          }}
          placeholder="Enter Your Email Address"
          type="email"
          value={email}
        />
        <button
          className="whitespace-nowrap border-b border-[#333333] pb-1 text-sm font-medium text-[#333333]"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </div>
      {subscribed ? (
        <p className="text-sm text-emerald-700">Subscribed. Thank you!</p>
      ) : null}
    </form>
  );
}
