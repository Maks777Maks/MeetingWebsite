﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels.NikitaModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.Account.Controllers.NikitaController
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserProfileModalController : ControllerBase
    {
        private readonly EFDbContext _context;
        public UserProfileModalController(EFDbContext context)
        {
            _context = context;
        }

        [HttpPost("get-user")]
        public ActionResult GetUserTable([FromBody] UserModalFilters filter)//проблема з виводом
        {
            var user = _context.UserProfile.Select(a => a).Where(a => a.Id == filter.Id).FirstOrDefault();

            UserModalModel userModalModel = new UserModalModel();

            userModalModel.Avatar = user.Avatar;
            userModalModel.Birthday = user.DateOfBirth.ToLongDateString();
            userModalModel.City = _context.City.Select(a=>a).Where(a=>user.CityId==a.Id).FirstOrDefault().Name;
            userModalModel.Gender = _context.Gender.Select(a => a).Where(a => user.GenderId==a.Id).FirstOrDefault().Type;
            userModalModel.NickName = user.NickName;
            userModalModel.Status = user.Status;
            userModalModel.Zodiac = _context.Zodiac.Select(a => a).Where(a => user.ZodiacId == a.Id).FirstOrDefault().Name;
            return Ok(userModalModel);
        }


    }
}