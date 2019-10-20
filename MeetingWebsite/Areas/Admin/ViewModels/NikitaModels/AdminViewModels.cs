﻿using MeetingWebsite.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Account.ViewModels
{
    public class UserTableModel
    {
        public string Id { get; set; }
        public string Nickname { get; set; }
        public string Registrdate { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
    }

    public class UserTableModels
    {
        public List<UserTableModel> Users { get; set; }
    }

    public class BanTableModel
    {
        public string Id { get; set; }
        public string Nickname { get; set; }
        public string Bandate { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }

    public class BanTableModels
    {
        public List<BanTableModel> Bans { get; set; }
    }

    public class BanUserModel
    {
        public string Id { get; set; }
        public string Description { get; set; }
    }

        public class UserTableFilters
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string NickName { get; set; }
        public int CurrentPage { get; set; }
    }
    public class RegistrySheduleFilters
    {
        public int Year { get; set; }
    }

}
