/* -*- Mode: javascript; indent-tabs-mode: nil; c-basic-offset: 4; tab-width: 4 -*-  */
/*
 * settings.js
 * Copyright (C) 2017 Michael Ott <Michael Ott <michael.ott@ic-nbg.com>>
 *
 * gtatoo is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * gtatoo is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const Gio = imports.gi.Gio;
const Lang = imports.lang;
const GLib = imports.gi.GLib

const ONLY_LOCAL = 'local';
const TEST_BOOLEAN = 'test-boolean';

const Settings = new Lang.Class({
	Name: 'Settings',
   
    _init: function() {
		print("Settings::_init()"); // DELETE
		let schema_name = 'org.gnome.gtatoo';
		//let schema_dir = extension.dir.get_child('schemas').get_path();
		let schema_dir = "schemas/";

		// Extension installed in .local
		if (GLib.file_test(schema_dir + '/gschemas.compiled', GLib.FileTest.EXISTS)) {
			let schema_source = Gio.SettingsSchemaSource.new_from_directory(schema_dir,
				Gio.SettingsSchemaSource.get_default(), false);
			let schema = schema_source.lookup(schema_name, false);
			this._settings = new Gio.Settings({settings_schema: schema});
		} else {
			if (Gio.Settings.list_schemas().indexOf(schema_name) == -1)
				throw "Schema \"%s\" not found.".format(schema_name);
			this._settings = new Gio.Settings({schema: schema_name});
		}
	},

	is_local: function() {
		return(this._settings.get_boolean(ONLY_LOCAL));
	},

	set_local: function(status) {
		this._settings.set_boolean(ONLY_LOCAL, status);
	},

	is_test: function() {
		return(this._settings.get_boolean(TEST_BOOLEAN));
	},

	set_test: function(status) {
		this._settings.set_boolean(TEST_BOOLEAN, status);
	},

})

