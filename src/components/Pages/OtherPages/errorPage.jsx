import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <section class="error-area error-one">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xxl-7 col-xl-8 col-lg-8">
              <div class="error-content text-center">
                <span class="error-404">404</span>
                <h5 class="sub-title">Page Not Found</h5>
                <p class="text">
                  There are many variations of passages of Lorem Ipsum avaable,
                  b majority have suffered alteration in some form
                </p>
                <div class="error-form">
                  <form action="#0">
                    <i class="lni lni-search-alt"></i>
                    <input type="text" placeholder="Search for page" />
                    <div class="error-btn rounded-buttons">
                      <button class="btn primary-btn rounded-full">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;