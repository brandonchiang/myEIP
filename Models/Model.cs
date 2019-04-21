using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace myEIPWebAPI.Model
{
    public class EIPContext: DbContext
    {
        public EIPContext(DbContextOptions<EIPContext> options)
            :base(options)
        {
        }

        public DbSet<Board> EIP_BOARD {get;set;}
        public DbSet<Events> EIP_EVENTS {get;set;}
        public DbSet<Staff> EIP_STAFF {get;set;}

    }
    public class Board
    {
        [Key]
        public int DATA_SEQ {get;set;}
        public string TITLE {get;set;}
        public string CONTENT {get;set;}
        public string ENTRY_ID {get;set;}
        public DateTime ENTRY_TIME {get;set;}

    }

    public class Events
    {
        [Key]
        public int DATA_SEQ {get;set;}
        public DateTime WORK_DATE {get;set;}
        public string EMP_NAME {get;set;}
        public string WORK_DESC {get;set;}

    }

    public class Staff
    {
        // public int id {get;set;}
        [Key]
        public string EMP_ID {get;set;}
        public string EMP_NAME {get;set;}
        public string VOUCHER_REMARK {get;set;}
        public string CORP_EMAIL {get;set;}
        public string CLOSE_YN {get;set;}

    }

}
