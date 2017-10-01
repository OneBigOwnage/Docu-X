-- Table definition for ums_user.
DROP TABLE IF EXISTS ums_user;
CREATE TABLE ums_user (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_password.
DROP TABLE IF EXISTS ums_password;
CREATE TABLE ums_password (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  user_id BIGINT(10) ZEROFILL NOT NULL, -- Foreign Key to ums_user.id
  pass_hash VARCHAR(4096) NOT NULL,
  pass_salt VARCHAR(4096) NOT NULL,
  expiration_date DATETIME DEFAULT NULL,

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_account.
DROP TABLE IF EXISTS ums_account;
CREATE TABLE ums_account (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  user_id BIGINT(10) ZEROFILL NOT NULL, -- Foreign Key to ums_user.id
  company_id BIGINT(10) ZEROFILL DEFAULT NULL, -- Foreign Key to ums_company.id

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_company.
DROP TABLE IF EXISTS ums_company;
CREATE TABLE ums_company (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  name VARCHAR(255) NOT NULL,
  coc_number VARCHAR(255),

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_permission.
DROP TABLE IF EXISTS ums_permission;
CREATE TABLE ums_permission (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  permission_key VARCHAR(255) NOT NULL,
  description VARCHAR(1024) DEFAULT NULL,

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_role.
DROP TABLE IF EXISTS ums_role;
CREATE TABLE ums_role (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  name VARCHAR(255) NOT NULL,
  description VARCHAR(1024) DEFAULT NULL,

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_granted_permission.
DROP TABLE IF EXISTS ums_granted_permission;
CREATE TABLE ums_granted_permission (
  id BIGINT(10) ZEROFILL AUTO_INCREMENT, -- Primary Key
  account_id BIGINT(10) ZEROFILL NOT NULL, -- Foreign key to ums_account.id
  permission_id BIGINT(10) ZEROFILL NOT NULL, -- Foreign Key to ums_permission.id
  role_id BIGINT(10) ZEROFILL DEFAULT NULL, -- Foreign Key to ums_role.id
  revoked_dt DATETIME DEFAULT NULL,

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (id)
);


-- Table definition for ums_role__permission.
DROP TABLE IF EXISTS ums_role__permission;
CREATE TABLE ums_role__permission (
  role_id BIGINT(10) ZEROFILL NOT NULL, -- Primary Key, Foreign Key to ums_role.id
  permission_id BIGINT(10) ZEROFILL NOT NULL, -- Primary Key, Foreign Key ro ums_permission.id

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (role_id, permission_id)
);


-- Table definition for ums_account__role.
DROP TABLE IF EXISTS ums_account__role;
CREATE TABLE ums_account__role (
  account_id BIGINT(10) ZEROFILL NOT NULL, -- Primary Key, Foreign Key to ums_account.id
  role_id BIGINT(10) ZEROFILL NOT NULL, -- Primary Key, Foreign Key to ums_role.id

  -- Standard issue Create/Update/Delete datetimes.
  c_dt DATETIME DEFAULT NOW(),
  u_dt DATETIME ON UPDATE NOW(),
  d_dt DATETIME,

  PRIMARY KEY (account_id, role_id)
);


-- Setting of the Forreign Keys.
ALTER TABLE ums_password
  ADD FOREIGN KEY fk_ums_password__to__ums_user
    (user_id) REFERENCES ums_user(id);


ALTER TABLE ums_account
  ADD CONSTRAINT FOREIGN KEY fk_ums_account__to__ums_user
    (user_id) REFERENCES ums_user(id),
  ADD CONSTRAINT FOREIGN KEY fk_ums_account__to__ums_company
    (company_id) REFERENCES ums_company(id);


ALTER TABLE ums_granted_permission
  ADD CONSTRAINT FOREIGN KEY fk_ums_granted_permission__to__ums_account
    (account_id) REFERENCES ums_account(id),
  ADD CONSTRAINT FOREIGN KEY fk_ums_granted_permission__to__ums_permission
    (permission_id) REFERENCES ums_permission(id),
  ADD CONSTRAINT FOREIGN KEY fk_ums_granted_permission__to__ums_role
    (role_id) REFERENCES ums_role(id);


ALTER TABLE ums_role__permission
  ADD CONSTRAINT FOREIGN KEY fk_ums_role__permission__to__ums_role
    (role_id) REFERENCES ums_role(id),
  ADD CONSTRAINT FOREIGN KEY fk_ums_role__permission__to__ums_permission
    (permission_id) REFERENCES ums_permission(id);


ALTER TABLE ums_account__role
  ADD CONSTRAINT FOREIGN KEY fk_ums_account__role__to__ums_account
    (account_id) REFERENCES ums_account(id),
  ADD CONSTRAINT FOREIGN KEY fk_ums_account__role__to__ums_role
    (role_id) REFERENCES ums_role(id);
