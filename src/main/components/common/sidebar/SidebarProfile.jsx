// Importing libraries
import React from "react";

const SidebarProfile = () => {
  // JSX
  return (
    <section className="sidebar-profile">
      <div className="image">
        <img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--G_-lp6GU--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/120938/66553921-bed5-4daa-abb3-202dc490b9df.png"
          alt=""
          className="avatar"
        />
      </div>
      <div className="profile-info">
        <h4>Esterling Accime</h4>
        <p>Web Developer</p>
      </div>
    </section>
  );
};

export default SidebarProfile;
