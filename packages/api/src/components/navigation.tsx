import { STUser } from "@skintracker/types/src";
import Button from "./button";
import { Link } from "./link";

export interface NavigationItem {
  name: string;
  route: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  user?: STUser;
}

export default function Navigation({ items, user }: NavigationProps) {
  const loginOrUserButton = user ? (
    <Button
      hx-get="/client/home/logout-modal"
      hx-target="body"
      hx-swap="beforeend"
    >
      <span class="px-1 hidden lg:inline-block" safe>
        {user.displayName}
      </span>
      <img src={user.avatar} alt="Steam Logo" width="24px" />
    </Button>
  ) : (
    <Button href="/login">
      <span class="px-1">Login</span>
      <svg
        title="Steam Logo"
        fill="#ffffff"
        width="24px"
        height="24px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Steam Logo</title>
        <path d="M 16 3 C 8.832 3 3 8.832 3 16 C 3 23.168 8.832 29 16 29 C 23.168 29 29 23.168 29 16 C 29 8.832 23.168 3 16 3 z M 16 5 C 22.065 5 27 9.935 27 16 C 27 22.065 22.065 27 16 27 C 10.891494 27 6.5985638 23.494211 5.3671875 18.765625 L 9.0332031 20.335938 C 9.2019466 21.832895 10.457908 23 12 23 C 13.657 23 15 21.657 15 20 C 15 19.968 14.991234 19.93725 14.990234 19.90625 L 19.167969 16.984375 C 21.297969 16.894375 23 15.152 23 13 C 23 10.791 21.209 9 19 9 C 16.848 9 15.106578 10.702031 15.017578 12.832031 L 12.09375 17.009766 C 12.06175 17.008766 12.032 17 12 17 C 11.336696 17 10.729087 17.22153 10.232422 17.585938 L 5.0332031 15.357422 C 5.3688686 9.5919516 10.151903 5 16 5 z M 19 10 C 20.657 10 22 11.343 22 13 C 22 14.657 20.657 16 19 16 C 17.343 16 16 14.657 16 13 C 16 11.343 17.343 10 19 10 z M 19 11 A 2 2 0 0 0 19 15 A 2 2 0 0 0 19 11 z M 12 18 C 13.105 18 14 18.895 14 20 C 14 21.105 13.105 22 12 22 C 11.191213 22 10.498775 21.518477 10.183594 20.828125 L 10.966797 21.164062 C 11.158797 21.247062 11.359641 21.287109 11.556641 21.287109 C 12.138641 21.287109 12.6935 20.945953 12.9375 20.376953 C 13.2635 19.615953 12.910438 18.734203 12.148438 18.408203 L 11.419922 18.095703 C 11.604729 18.039385 11.796712 18 12 18 z" />
      </svg>
    </Button>
  );
  return (
    <nav id="navigation" class="bg-slate-800 text-white py-4 px-8">
      <div id="navigation-container" class="grid grid-cols-2">
        <Link class="flex self-center items-center" href="/">
          <svg
            width="211"
            height="211"
            viewBox="0 0 211 211"
            class="inline-block w-[32px] h-[32px]"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            alt="Skintracker logo"
            aria-label="Skintracker logo"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M104.691 0.00314426C129.749 -0.189178 154.058 8.54474 173.265 24.641L164.116 35.5578C147.503 21.6347 126.475 14.08 104.8 14.2463C83.1242 14.4127 62.2156 22.2893 45.8177 36.4658C29.4199 50.6422 18.6038 70.1928 15.3061 91.6168C12.776 108.053 14.7982 124.769 21.0138 139.994L59.5001 122C60.0803 112.051 61.6543 107.886 64.5001 100.5L109 77.5L110 79.5L127.5 71L129.5 74L149 64C154.21 64.161 156.311 66.0069 159.5 70.5L182 60L180 50L185 48L188.5 57.5L191.5 56L194 61.5L153.5 80.5V84.5L139.5 92V95L127 100.5L125.5 105L119.5 107C126.88 118.927 132.114 123.264 144 125.5L139.5 144C124.715 141.828 116.821 137.116 103.5 122C105.512 128.906 106.638 132.775 106 134L100.5 136C97.9857 136.619 96.5567 135.923 94.0001 134C92.8187 136.187 98.9668 159.839 100.5 159C102.033 158.161 88.8465 166.391 82.0001 162.5C81.7073 159.475 81.492 156.816 81.2997 154.442C80.5593 145.302 80.1607 140.381 77.0001 135C75.5783 134.961 74.3902 134.862 73.3369 134.775C69.7884 134.479 67.7705 134.311 63.5001 137C58.2127 142.941 56.1675 148.375 54.0016 154.129C52.2138 158.879 50.3437 163.848 46.5001 169.5L42.8044 171.81C52.594 181.065 64.3854 188.108 77.3897 192.319C98.012 198.996 120.338 198.115 140.369 189.832C160.401 181.55 176.83 166.407 186.715 147.116C196.6 127.825 199.296 105.645 194.319 84.5478L208.182 81.2775C213.935 105.668 210.819 131.309 199.391 153.612C187.963 175.914 168.97 193.42 145.812 202.995C122.654 212.57 96.8432 213.589 73.0022 205.87C49.1611 198.151 28.8463 182.197 15.6953 160.865C2.54426 139.534 -2.58418 114.218 1.22825 89.4498C5.04069 64.6819 17.545 42.0799 36.5023 25.6907C55.4595 9.30147 79.6317 0.195467 104.691 0.00314426Z"
            />
            <path d="M92.728 40C96.4017 47.2448 99.2763 49.8824 105.456 52.7279C99.2216 55.7355 96.1895 58.1406 92.728 65.4558C88.9266 57.6394 86.1532 54.7905 80.0001 52.7279C86.2722 50.0437 88.9642 47.087 92.728 40Z" />
            <path d="M55.7803 67.9479C57.7522 71.8368 59.2953 73.2526 62.6124 74.78C59.2659 76.3944 57.6383 77.6855 55.7803 81.6122C53.7397 77.4164 52.251 75.8872 48.9481 74.78C52.3149 73.3392 53.7599 71.7521 55.7803 67.9479Z" />
          </svg>
          <span class="text-xl font-bold pl-2">Skintracker</span>
        </Link>
        <ul class="justify-self-end self-center items-center inline-flex">
          {items.map((item) => {
            return (
              <li class="mr-2 hidden md:inline-flex">
                <Link class="p-2" href={item.route}>
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li class="mr-4">
            <Link
              hx-trigger="click, keydown[metaKey && key=='k'] from:html"
              hx-get="/client/command/bar"
              hx-target="body"
              hx-swap="beforeend"
            >
              <span class="mr-2">Actions</span>
              <span class="text-white/70">⌘K</span>
            </Link>
          </li>
          <li>{loginOrUserButton}</li>
        </ul>
      </div>
    </nav>
  );
}
