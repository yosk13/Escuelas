using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ZamSoft.School.REST.UI.Controllers
{
    public class AccountController : Controller
    {
        // GET: Accountt
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Manage()
        {
            return View();
        }
    }
}