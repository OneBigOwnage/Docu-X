-- Queries to remove & re-generate the User Management System
-- #############################################################################

-- Remove all Foreign Keys
ALTER TABLE fwk_error_log
  DROP FOREIGN KEY IF EXISTS fk_fwk_error_log__to__ums_account;

ALTER TABLE fwk_console
	DROP FOREIGN KEY IF EXISTS fk_fwk_console__to__ums_account;
-- #############################################################################

-- Table definition for fwk_error_log.
DROP TABLE IF EXISTS fwk_error_log;
CREATE TABLE fwk_error_log (
	id BIGINT (10) ZEROFILL AUTO_INCREMENT, -- Primary Key
	error_object JSON NOT NULL,
	object_class VARCHAR (255) NOT NULL,
	account_id BIGINT (10) ZEROFILL,	-- Foreign Key to ums_account.id

  -- Standard issue Create/Update/Delete datetimes.
	c_dt DATETIME DEFAULT NOW(),
	u_dt DATETIME ON UPDATE NOW(),
	d_dt DATETIME,
	PRIMARY KEY (id)
);

-- Table definition for fwk_console.
DROP TABLE IF EXISTS fwk_console;
CREATE TABLE fwk_console (
	id BIGINT (10) ZEROFILL AUTO_INCREMENT, -- Primary Key
	output_text TEXT,
	line_number INT,
	file_name VARCHAR(255),
	is_shown TINYINT(1),
	account_id BIGINT (10) ZEROFILL,	-- Foreign Key to ums_account.id

  -- Standard issue Create/Update/Delete datetimes.
	c_dt DATETIME DEFAULT NOW(),
	u_dt DATETIME ON UPDATE NOW(),
	d_dt DATETIME,
	PRIMARY KEY (id)
);
-- #############################################################################


-- Setting of the Forreign Keys.
ALTER TABLE fwk_error_log ADD CONSTRAINT FOREIGN KEY fk_fwk_error_log__to__ums_account
  (account_id) REFERENCES ums_account (id);


ALTER TABLE fwk_console ADD CONSTRAINT FOREIGN KEY fk_fwk_console__to__ums_account
  (account_id) REFERENCES ums_account (id);
