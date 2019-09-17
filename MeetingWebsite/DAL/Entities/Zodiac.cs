﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class Zodiac
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
