/* -*- Mode: javascript; indent-tabs-mode: nil; c-basic-offset: 4; tab-width: 4 -*-  */
/*
 * local-json-data.js
 * Copyright (C) 2017 Michael Ott <kc.videri@gmail.com>
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

const Lang = imports.lang;
const GLib = imports.gi.GLib
const Gio = imports.gi.Gio

const DATA_FOLDER = "/gtatoo"

const LocalData = new Lang.Class({
	Name: 'Local Data',

	_init: function() {
		print("LocalData::init"); // DELETE
		var path;
		var file_info;
		var file;
		var retval;

		path = GLib.get_user_data_dir() + DATA_FOLDER;
		print("LocalData::init(): path: " + path); // DELETE
		//file = new Gio.File(path);
		file = Gio.File.new_for_path(path);
		file_info = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null);
		if (file_info == Gio.FileType.UNKNOWN) {
			print("unknown Make directory "); // DELETE
			retval = file.make_directory(null);
			if (retval == false) {
				print("Cannot create data directory");
				exit(-1);
			}
		}
	},

	get_config_dir: function() {
		print("LocalData::get_config_dir"); // DELETE
	},

})

const LocalJsonData = new Lang.Class({
	Name: 'Local JSON Data',
	Extends: LocalData, 

	_init: function() {
		print("LocalJsonData::init"); // DELETE
		this.parent();
	},

	/*
	get_config_dir: function() {
		print("LocalJsonData::get_config_dir"); // DELETE
	},
	*/

})

