using System.Threading.Tasks;
using Application.Tracking;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TrackingController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Track(string username)
        {
            return HandleResult(await Mediator.Send(new TrackerToggle.Command { TargetUsername = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetTrackers(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        }
    }
}