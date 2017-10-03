DROP TABLE IF EXISTS fwk_event_log;
CREATE TABLE fwk_event_log (
	id BIGINT (10) ZEROFILL AUTO_INCREMENT, -- Primary Key
	message TEXT NOT NULL,
	type VARCHAR (255) NOT NULL,
	origin VARCHAR (255) DEFAULT 'undefined',
	account_id BIGINT (10) ZEROFILL,	-- Foreign Key to ums_account.id

  -- Standard issue Create/Update/Delete datetimes.
	c_dt DATETIME DEFAULT NOW(),
	u_dt DATETIME ON UPDATE NOW(),
	d_dt DATETIME,
	PRIMARY KEY (id)
);

ALTER TABLE fwk_event_log ADD CONSTRAINT FOREIGN KEY fk_fwk_event_log__to__ums_account
  (account_id) REFERENCES ums_account (id);
