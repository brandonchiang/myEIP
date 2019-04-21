using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using myEIPWebAPI.Model;

namespace myEIPWebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly EIPContext _context;

        public BoardController(EIPContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Board>> Get()
        {

            // var boardList = @"[
            //     {'Title': '電話雜音','Content': '有同仁反應講電話會有雜音，今天電話公司已更換1線、7線及8線共3條的線路，若發現仍有雜音請再告知是哪一條線路，謝謝！','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': '林粹倫 <annie.lin@uscsoft.com.tw>'},
            //     {'Title': '花蓮薯','Content': '樓下管理員伯伯放一盒花蓮薯在茶水區,請大家自行取用！','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': 'ayne_Kuhic@sydney.com'},
            //     {'Title': 'teamviewer 的使用人數','Content': '樓除了TeamViewer 外，還有一種連線軟體，叫 AnyDesk ，免安裝，我自已用過一段時間，效能還不錯。如果 teamviewer 經常不夠用的同仁，建議可以試試看。','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': '江育勳 <yohun@uscsoft.com.tw>'},
            //     {'Title': '浴室的燈炮','Content': '冰箱那側浴室的燈泡壞了 我先拿休息室的燈泡換上了 那浴室外側有一個燈泡 休息室有兩個燈泡 目前所知需至少要三個燈泡需更換 負責人員請採購再裝上 謝謝','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': '莊志鴻 <ccchung@uscsoft.com.tw>'},
            //     {'Title': 'test5','Content': 'test5','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': '莊志鴻 <ccchung@uscsoft.com.tw>'},
            //     {'Title': 'test6','Content': 'test6','EntryTime': '2018-05-11T21:58:27.358Z','EntryID': '莊志鴻 <ccchung@uscsoft.com.tw>'},
            // ]";

            // return JsonConvert.DeserializeObject<Board[]>(boardList);

            using (var context = _context)
            {
                return context.EIP_BOARD.ToList();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Board> Get(int id)
        {
            using (var context = _context)
            {
                return context.EIP_BOARD.SingleOrDefault(b=>b.DATA_SEQ==id);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
