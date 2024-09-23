import LayoutAdmin from "@layouts/layout-admin/LayoutAdmin";
import styles from "./dashboard.module.scss";

const DashboardPage = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <LayoutAdmin>
      <div className={styles.dashboard}>
        <div className={styles.card} style={{ paddingBlock: "1px" }}>
          <div className={styles.bodySection}>Dashboard</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>PURPOSE</span>
          </div>

          <form>
            <div className={styles.formRow}>
              This application serves as a personal project developed to explore
              and deepen understanding of the MERN stack. It utilizes various
              libraries and APIs to enhance functionality and showcase their
              integration within a real-world context.
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>SCOPE </span>
          </div>

          <div className={styles.cardTitle}>
            <span>For Users </span>
          </div>

          <form>
            <div className={styles.formRow}>
              Accommodation Search: Users can search for available
              accommodations and make bookings. Currently, the application
              supports payment via credit card and allows users to view their
              bookings. Each property’s availability is managed on a per-room
              basis.
            </div>
          </form>

          <br />

          <div className={styles.cardTitle}>
            <span>For Admin: </span>
          </div>

          <form>
            <div className={styles.formRow}>
              Accommodation Search: Users have the ability to search for
              available properties.
            </div>
            <div className={styles.formRow}>
              Room Management: Admins can manage property listings and room
              details. Currently, the scope is limited to these functionalities.
            </div>
            <div className={styles.formRow}>
              Notable Feature: The property management system includes a feature
              for admins to search for a location using the Nominatim API,
              allowing them to retrieve the location's coordinates.
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>TECHNOLOGIES USED</span>
          </div>

          <div className={styles.cardTitle}>
            <span>Core Technologies: </span>
          </div>

          <form>
            <div className={styles.formRow}>
              MongoDB, Express, React (with TypeScript), and Node.js.
            </div>
          </form>
          <br />
          <div className={styles.cardTitle}>
            <span>APIs and SDKs: </span>
          </div>

          <form>
            <div className={styles.formRow}>
              <ul>
                <li> Stripe: Handles secure card payments.</li>
                <li>
                  Nominatim API: Provides location search and place positioning.
                </li>
                <li>
                  Cloudinary SDK: Facilitates image uploads and automatic
                  optimization.
                </li>
              </ul>
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>ARCHITECTURE</span>
          </div>
          <div className={styles.cardTitle}>
            <span>Frontend: </span>
          </div>
          <form>
            <div className={styles.formRow}>
              <p>
                Generic Repository Pattern: Implemented to abstract and manage
                data interactions, ensuring a clean separation of concerns.
              </p>
              <p>
                API Layer: Facilitates communication between the frontend and
                backend, handling requests and responses efficiently.
              </p>
            </div>
          </form>
          <br />
          <div className={styles.cardTitle}>
            <span>Backend: </span>
          </div>{" "}
          <form>
            <div className={styles.formRow}>
              Route-Controller-Service-Model Layer: A structured approach to
              backend development, dividing responsibilities into routes,
              controllers, services, and models to maintain a clean and scalable
              architecture.
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>TESTING</span>
          </div>

          <form>
            <div className={styles.formRow}>
              Vitest: Utilized for unit testing in the backend, specifically for
              selected modules.
            </div>
            <div className={styles.formRow}>
              Playwright: Employed for end-to-end (E2E) testing of property and
              room management features in the frontend.{" "}
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>RESPONSIVENESS</span>
          </div>

          <form>
            <div className={styles.formRow}>
              ADMIN: Strictly for desktop/laptop only.
            </div>
            <div className={styles.formRow}>
              SPECIFIC SIZES FOR USER PAGES:
              <br />
              Ideal for 801px (or greater) for large devices.
              <br />
              Ideal for 576px to 800px for medium devices.
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>ADDITIONAL LIBRARIES and PACKAGES</span>
          </div>

          <form>
            <div className={styles.formRow}>
              <ul>
                <li>
                  React Hook Form: Simplifies form creation and validation.
                </li>
                <li>Axios: Handling http requests to backend.</li>
                <li>
                  Multer: Manages image uploads by temporarily storing files
                  before transferring them to the cloud.
                </li>
                <li>Zod: Schema validation in backend.</li>
                <li>Mongoose: ODM library for MongoDB.</li>
              </ul>
              <i>
                For a complete list of libraries and packages, please refer to
                the package.json file.
              </i>
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>NOTES</span>
          </div>

          <form>
            <div className={styles.formRow}>
              This application extends beyond basic CRUD operations, though
              there are areas for future improvement. The developer acknowledges
              these gaps and plans to address them in future updates. For now,
              focus has shifted to other projects.
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>TL;DR</span>
          </div>

          <div className={styles.cardTitle}>
            <span>User Access: </span>
          </div>
          <form>
            <div className={styles.formRow}>
              <p>Navigate to domain/login</p>
              <p>Email: user@gmail.com</p> <p>Password: Test123</p>
            </div>
          </form>
          <br />
          <div className={styles.cardTitle}>
            <span>Admin Access: </span>
          </div>
          <form>
            <div className={styles.formRow}>
              <p>Navigate to domain/admin/login</p>
              <p>Username: admin</p> <p>Password: Test123</p>
            </div>
          </form>
        </div>

        <div className={styles.scrollToBottom} onClick={scrollToBottom}>
          &#x21E9; {/* Unicode for downwards arrow */}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default DashboardPage;
