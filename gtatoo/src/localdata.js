
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

const Lang = imports.lang;

const LocalJsonData = new Lang.Class({
	Name: 'Local JSON Data',

	_init: function() {
        print("LocalJsonData::init");
    },

	get_config_dir: function() {
        print("LocalJsonData::get_config_dir");
    },

})

